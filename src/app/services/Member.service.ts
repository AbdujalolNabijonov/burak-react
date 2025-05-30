import axios from "axios";
import { server } from "../../lib/config";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member.type";

class MemberService {
    private readonly server;
    constructor() {
        this.server = server
    }

    public async signup(memberInput: MemberInput): Promise<Member> {
        try {
            const url = `${this.server}/member/signup`;
            const response = await axios.post(url, memberInput, { withCredentials: true });

            return response.data.member
        } catch (err: any) {
            console.log(`Error: signup, ${err.message}`)
            throw err
        }
    }

    public async login(input: LoginInput): Promise<Member> {
        try {
            const url = `${this.server}/member/login`;

            const response = await axios.post(url, input, { withCredentials: true });

            return response.data.member
        } catch (err: any) {
            console.log(`Error: login, ${err.message}`)
            throw err
        }
    }

    public async logout() {
        try {
            const url = `${this.server}/member/logout`;
            await axios.post(url, {}, { withCredentials: true });

            localStorage.removeItem("member");
        } catch (err: any) {
            console.log(`Error: logout, ${err.message}`)
            throw err
        }
    }

    public async updateMember(input: MemberUpdateInput): Promise<Member> {
        try {
            const url = `${this.server}/member/update`;
            const formData = new FormData();
            formData.append("memberNick", input.memberNick || "")
            formData.append("memberPhone", input.memberPhone || "")
            formData.append("memberAddress", input.memberAddress || "")
            formData.append("memberDesc", input.memberDesc || "");

            const response = await axios({
                method: "POST",
                url,
                data: formData,
                headers: {
                    "Content-Type": "multipart/formData"
                },
                withCredentials: true
            })
            console.log(response.data);
            return response.data
        } catch (err: any) {
            console.log(`Error: getRestaurant, ${err.message}`);
            throw err
        }
    }

    public async getTopUsers(): Promise<Member[]> {
        try {
            const url = `${this.server}/member/top-users`;
            const result = await axios.get(url);

            return result.data

        } catch (err: any) {
            console.log(`Error: getTopUsers, ${err.message}`);
            throw err
        }
    }

    public async getRestaurant(): Promise<Member> {
        try {
            const url = `${this.server}/member/restaurant`;
            const result = await axios.get(url);

            return result.data
        } catch (err: any) {
            console.log(`Error: getRestaurant, ${err.message}`);
            throw err
        }
    }

}

export default MemberService