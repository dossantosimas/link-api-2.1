export interface IDockerContainer {
  Id: string;
  Names: string[];
  Image: string;
  Command: string;
  Created: number;
  Ports: { PrivatePort: number; Type: string }[];
  Labels: { [key: string]: string };
  State: string;
  Status: string;
  HostConfig: { NetworkMode: string };
  NetworkSettings: {
    Networks: {
      [key: string]: {
        NetworkID: string;
        EndpointID: string;
        Gateway: string;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        MacAddress: string;
      };
    };
  };
  Mounts: {
    Type: string;
    Source: string;
    Destination: string;
    Mode: string;
    RW: boolean;
    Propagation: string;
  }[];
}


export interface IExecId {
  Id: string;
}
