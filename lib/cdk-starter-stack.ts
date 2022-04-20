/* eslint-disable no-restricted-syntax */
import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import * as iam from "@aws-cdk/aws-iam"; //flowlogs
import * as logs from '@aws-cdk/aws-logs'; //flowlogs

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'my-cdk-vpc', {
      cidr: '10.0.0.0/16',
      natGateways: 1,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'private-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE,
          cidrMask: 24,
        },
        {
          name: 'public-subnet-1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    });

    // 👇 update the Name tag for the VPC
    cdk.Aspects.of(vpc).add(new cdk.Tag('Name', 'my-cdk-vpc'));

    // 👇 update the Name tag for public subnets
    for (const subnet of vpc.publicSubnets) {
      cdk.Aspects.of(subnet).add(
        new cdk.Tag(
          'Name',
          `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${
            subnet.availabilityZone
          }`,
        ),
      );
    }

    // 👇 update the Name tag for private subnets
    for (const subnet of vpc.privateSubnets) {
      cdk.Aspects.of(subnet).add(
        new cdk.Tag(
          'Name',
          `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${
            subnet.availabilityZone
          }`,
        ),
      );
    }

    // 👇 update the Name tag for private subnets
    for (const subnet of vpc.isolatedSubnets) {
      cdk.Aspects.of(subnet).add(
        new cdk.Tag(
          'Name',
          `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${
            subnet.availabilityZone
          }`,
        ),
      );
    }


    // VPC Flow Logs
    const logGroup = new logs.LogGroup(this, 'MyCustomLogGroup', {
      retention: logs.RetentionDays.THREE_MONTHS,
    });

    const iamRoleFlowLogs = new iam.Role(this, 'flow-log-role', {
      assumedBy: new iam.ServicePrincipal('vpc-flow-logs.amazonaws.com')
    });

    new ec2.FlowLog(this, 'FlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(logGroup, iamRoleFlowLogs)
    });

    new cdk.CfnOutput(this, 'vpcId', {
      value: vpc.vpcId,
      description: 'the ID of the VPC',
    });
  }
}

 const app = new cdk.App();
 new CdkStarterStack(app, 'MyCDKvpc');
 app.synth();