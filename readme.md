# Pulumi Crossguard examples for Azure

Following the article on [my blog](https://david-obrien.net/2020/03/cloud-governance-pulumi) I am publishing these examples here to be used without guarantees in your environment.

## Usage

1. Install prereqs

```bash
npm install
```

1. (if you're using the Pulumi service) Publish the policy pack to your Pulumi Organisation

```bash
PULUMI_EXPERIMENTAL=true pulumi policy publish
```

`PULUMI_EXPERIMENTAL` is required for as long as this feature is in preview.
This command will publish the policy pack to your logged in Pulumi Organisation.

Now enable the published policy.

```bash
PULUMI_EXPERIMENTAL=true pulumi policy enable <org-name>/<policy-pack-name> <version>
```

2. (if you're **not** using the Pulumi service) Refer to the local policy pack

```bash
PULUMI_EXPERIMENTAL=true pulumi preview --policy-pack <path to directory with policy pack>
```
