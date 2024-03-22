interface Hardware {
  HARDWARE_ID: number
  TAG: string
  ID: number
  DEVICEID: string
  NAME: string
  WORKGROUP: string
  USERDOMAIN: string | null
  OSNAME: string
  OSVERSION: string
  OSCOMMENTS: string
  PROCESSORT: string
  PROCESSORS: number
  PROCESSORN: number
  MEMORY: number
  SWAP: number
  IPADDR: string
  DNS: string
  DEFAULTGATEWAY: string
  ETIME: string | null
  LASTDATE: string
  LASTCOME: string
  QUALITY: string
  FIDELITY: number
  USERID: string
  TYPE: number
  DESCRIPTION: string
  WINCOMPANY: string | null
  WINOWNER: string | null
  WINPRODID: string | null
  WINPRODKEY: string | null
  USERAGENT: string
  CHECKSUM: number
  SSTATE: number
  IPSRC: string
  UUID: string
  ARCH: string | null
}

export type ArrayHardware = Hardware[]
