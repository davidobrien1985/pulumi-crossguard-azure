import * as azure from "@pulumi/azure";
import { PolicyPack, validateResourceOfType } from "@pulumi/policy";

var regions: Array<string> = ['Australia East', 'australiaeast', 'Australia Southeast', 'australiasoutheast'];
var vmSizes: Array<string> = ['Standard_D1_v2', 'Standard_D2_v2', 'Standard_D3_v2', 'Standard_F2s_v2'];

new PolicyPack("azure-generic", {
    policies: [
        {
            name: "enforce-storage-https",
            description: "Storage Accounts must enforce https",
            enforcementLevel: "mandatory",
            validateResource: validateResourceOfType(azure.storage.Account, (account, args, reportViolation) => {
                if (!account.enableHttpsTrafficOnly) {
                    reportViolation(
                        "Azure Storage Accounts must be set to enforce only HTTPS connections.");
                }
            })
        },
        {
            name: "only-aue-ause",
            description: "only allow resources to be deployed in Australia",
            enforcementLevel: "mandatory",
            validateResource: (args, reportViolation) => {
                if (args.props.hasOwnProperty('location')) {
                    if (!regions.includes(args.props.location)) {
                        reportViolation("Deployment of services outside Australia is prohibited. Found " +
                        args.props.location
                        );
                    }
                };
            }
        },
        {
            name: "allowed-vm-size",
            description: "VM Size must be one of allowed values",
            enforcementLevel: "advisory",
            validateResource: validateResourceOfType(azure.compute.VirtualMachine, (vm, args, reportViolation) => {
                if (!vmSizes.includes(vm.vmSize)) {
                    reportViolation(
                        "Virtual Machine Size not allowed. Use one of " +
                        vmSizes
                    )
                };
            })
        }
    ],
});
