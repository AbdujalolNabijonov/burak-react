import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
    _id: string;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword?: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberInput {
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string
}

export interface MemberUpdateInput {
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick?: string;
    memberPhone?: string;
    memberPassword?: string;
    memberImage?: HTMLElement | string;
    memberAddress?: string;
    memberDesc?: string;
    memberPoints?: number;
}
export interface LoginInput {
    memberNick: string;
    memberPassword: string
}