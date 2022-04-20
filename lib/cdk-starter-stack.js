"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStarterStack = void 0;
const ec2 = __importStar(require("@aws-cdk/aws-ec2"));
const cdk = __importStar(require("@aws-cdk/core"));
class CdkStarterStack extends cdk.Stack {
    constructor(scope, id, props) {
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
                {
                    name: 'isolated-subnet-1',
                    subnetType: ec2.SubnetType.ISOLATED,
                    cidrMask: 28,
                },
            ],
        });
        cdk.Aspects.of(vpc).add(new cdk.Tag('Name', 'my-cdk-vpc'));
        for (const subnet of vpc.publicSubnets) {
            cdk.Aspects.of(subnet).add(new cdk.Tag('Name', `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`));
        }
        for (const subnet of vpc.privateSubnets) {
            cdk.Aspects.of(subnet).add(new cdk.Tag('Name', `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`));
        }
        for (const subnet of vpc.isolatedSubnets) {
            cdk.Aspects.of(subnet).add(new cdk.Tag('Name', `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`));
        }
        new cdk.CfnOutput(this, 'vpcId', {
            value: vpc.vpcId,
            description: 'the ID of the VPC',
        });
    }
}
exports.CdkStarterStack = CdkStarterStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YXJ0ZXItc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGstc3RhcnRlci1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQXdDO0FBQ3hDLG1EQUFxQztBQUVyQyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxLQUFjLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzFDLElBQUksRUFBRSxhQUFhO1lBQ25CLFdBQVcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxFQUFFLENBQUM7WUFDVCxtQkFBbUIsRUFBRTtnQkFDbkI7b0JBQ0UsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTztvQkFDbEMsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTtvQkFDakMsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUTtvQkFDbkMsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUdILEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFHM0QsS0FBSyxNQUFNLE1BQU0sSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQ3RDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUNULE1BQU0sRUFDTixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLElBQzFELE1BQU0sQ0FBQyxnQkFDVCxFQUFFLENBQ0gsQ0FDRixDQUFDO1NBQ0g7UUFHRCxLQUFLLE1BQU0sTUFBTSxJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDdkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQ1QsTUFBTSxFQUNOLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsSUFDMUQsTUFBTSxDQUFDLGdCQUNULEVBQUUsQ0FDSCxDQUNGLENBQUM7U0FDSDtRQUdELEtBQUssTUFBTSxNQUFNLElBQUksR0FBRyxDQUFDLGVBQWUsRUFBRTtZQUN4QyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FDVCxNQUFNLEVBQ04sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUMxRCxNQUFNLENBQUMsZ0JBQ1QsRUFBRSxDQUNILENBQ0YsQ0FBQztTQUNIO1FBRUQsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDL0IsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ2hCLFdBQVcsRUFBRSxtQkFBbUI7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdkVELDBDQXVFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnQGF3cy1jZGsvYXdzLWVjMic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBDZGtTdGFydGVyU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgdnBjID0gbmV3IGVjMi5WcGModGhpcywgJ215LWNkay12cGMnLCB7XG4gICAgICBjaWRyOiAnMTAuMC4wLjAvMTYnLFxuICAgICAgbmF0R2F0ZXdheXM6IDEsXG4gICAgICBtYXhBenM6IDMsXG4gICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncHJpdmF0ZS1zdWJuZXQtMScsXG4gICAgICAgICAgc3VibmV0VHlwZTogZWMyLlN1Ym5ldFR5cGUuUFJJVkFURSxcbiAgICAgICAgICBjaWRyTWFzazogMjQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncHVibGljLXN1Ym5ldC0xJyxcbiAgICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QVUJMSUMsXG4gICAgICAgICAgY2lkck1hc2s6IDI0LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2lzb2xhdGVkLXN1Ym5ldC0xJyxcbiAgICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5JU09MQVRFRCxcbiAgICAgICAgICBjaWRyTWFzazogMjgsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgLy8g8J+RhyB1cGRhdGUgdGhlIE5hbWUgdGFnIGZvciB0aGUgVlBDXG4gICAgY2RrLkFzcGVjdHMub2YodnBjKS5hZGQobmV3IGNkay5UYWcoJ05hbWUnLCAnbXktY2RrLXZwYycpKTtcblxuICAgIC8vIPCfkYcgdXBkYXRlIHRoZSBOYW1lIHRhZyBmb3IgcHVibGljIHN1Ym5ldHNcbiAgICBmb3IgKGNvbnN0IHN1Ym5ldCBvZiB2cGMucHVibGljU3VibmV0cykge1xuICAgICAgY2RrLkFzcGVjdHMub2Yoc3VibmV0KS5hZGQoXG4gICAgICAgIG5ldyBjZGsuVGFnKFxuICAgICAgICAgICdOYW1lJyxcbiAgICAgICAgICBgJHt2cGMubm9kZS5pZH0tJHtzdWJuZXQubm9kZS5pZC5yZXBsYWNlKC9TdWJuZXRbMC05XSQvLCAnJyl9LSR7XG4gICAgICAgICAgICBzdWJuZXQuYXZhaWxhYmlsaXR5Wm9uZVxuICAgICAgICAgIH1gLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyDwn5GHIHVwZGF0ZSB0aGUgTmFtZSB0YWcgZm9yIHByaXZhdGUgc3VibmV0c1xuICAgIGZvciAoY29uc3Qgc3VibmV0IG9mIHZwYy5wcml2YXRlU3VibmV0cykge1xuICAgICAgY2RrLkFzcGVjdHMub2Yoc3VibmV0KS5hZGQoXG4gICAgICAgIG5ldyBjZGsuVGFnKFxuICAgICAgICAgICdOYW1lJyxcbiAgICAgICAgICBgJHt2cGMubm9kZS5pZH0tJHtzdWJuZXQubm9kZS5pZC5yZXBsYWNlKC9TdWJuZXRbMC05XSQvLCAnJyl9LSR7XG4gICAgICAgICAgICBzdWJuZXQuYXZhaWxhYmlsaXR5Wm9uZVxuICAgICAgICAgIH1gLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyDwn5GHIHVwZGF0ZSB0aGUgTmFtZSB0YWcgZm9yIHByaXZhdGUgc3VibmV0c1xuICAgIGZvciAoY29uc3Qgc3VibmV0IG9mIHZwYy5pc29sYXRlZFN1Ym5ldHMpIHtcbiAgICAgIGNkay5Bc3BlY3RzLm9mKHN1Ym5ldCkuYWRkKFxuICAgICAgICBuZXcgY2RrLlRhZyhcbiAgICAgICAgICAnTmFtZScsXG4gICAgICAgICAgYCR7dnBjLm5vZGUuaWR9LSR7c3VibmV0Lm5vZGUuaWQucmVwbGFjZSgvU3VibmV0WzAtOV0kLywgJycpfS0ke1xuICAgICAgICAgICAgc3VibmV0LmF2YWlsYWJpbGl0eVpvbmVcbiAgICAgICAgICB9YCxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ3ZwY0lkJywge1xuICAgICAgdmFsdWU6IHZwYy52cGNJZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAndGhlIElEIG9mIHRoZSBWUEMnLFxuICAgIH0pO1xuICB9XG59XG4iXX0=