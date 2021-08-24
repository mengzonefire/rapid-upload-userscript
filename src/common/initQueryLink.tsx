import { locUrl, bdlinkPattern } from "@/common/const";

export var bdlink: string = "";

/**
 * @description: 从url中解析秒传链接
 */
export default function initQueryLink(): void {
  let bdlinkB64 = locUrl.match(bdlinkPattern);
  if (bdlinkB64) {
    bdlink = bdlinkB64[1].fromBase64();
  }
}
