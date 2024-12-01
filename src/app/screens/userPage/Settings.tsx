import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member.type";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common.type";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Message, server } from "../../../lib/config";
import MemberService from "../../services/Member.service";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals()

  const [preLoader, setPrdeLoader] = useState<string>(
    authMember?.memberImage ? `${server}/${authMember?.memberImage}` : "/icons/default-user.svg"
  )
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage
    }
  )

  //Handlers
  const changeNickHandler = (e: T) => {
    console.log(e.target.value)
    setMemberUpdateInput({ ...memberUpdateInput, memberNick: e.currentTarget.value });
  }
  const changePhoneHandler = (e: T) => {
    setMemberUpdateInput({ ...memberUpdateInput, memberPhone: e.currentTarget.value });
  }
  const changeAddrHandler = (e: T) => {
    setMemberUpdateInput({ ...memberUpdateInput, memberAddress: e.currentTarget.value });
  }
  const changeDescHandler = (e: T) => {
    setMemberUpdateInput({ ...memberUpdateInput, memberDesc: e.currentTarget.value });
  }
  const changeImageHandler = async (e: T) => {
    const file = e.target.files[0];
    console.log(file.type)
    const type = file.type
    const validList = ["image/jpg", "image/jpeg", "image/png", "image/png"];
    if (!validList.includes(type)) await sweetErrorHandling(Message.error5);

    memberUpdateInput.memberImage = file;
    setMemberUpdateInput({ ...memberUpdateInput })
    setPrdeLoader(URL.createObjectURL(file));
  }

  const updateMemberHandler = async () => {
    try {
      if (memberUpdateInput.memberNick === "" || memberUpdateInput.memberPhone === "" || memberUpdateInput.memberDesc === "") {
        throw new Error(Message.error3);
      }

      const membeService = new MemberService();
      const updatedMember = await membeService.updateMember(memberUpdateInput);

      await sweetTopSmallSuccessAlert("Successfully updated!")
      localStorage.setItem("member", JSON.stringify(updatedMember))
      setAuthMember(updatedMember)
    } catch (err: any) {
      await sweetErrorHandling(err)
    }
  }

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={preLoader} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={changeImageHandler}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={memberUpdateInput.memberNick}
            value={memberUpdateInput.memberNick}
            name={'memberNick'}
            onChange={changeNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={memberUpdateInput.memberPhone}
            value={memberUpdateInput.memberPhone}
            name={"memberPhone"}
            onChange={changePhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={memberUpdateInput.memberAddress ?? "no address"}
            value={memberUpdateInput.memberAddress ?? "no address"}
            name="memberAddress"
            onChange={changeAddrHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={memberUpdateInput.memberDesc ?? "no description"}
            value={memberUpdateInput.memberDesc ?? "no description"}
            name="memberDesc"
            onChange={changeDescHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={updateMemberHandler}>Save</Button>
      </Box>
    </Box>
  );
}
