import axios from "axios";
import { server } from "../../lib/config";
import { Member } from "../../lib/types/member.type";

class MemberService {
    private readonly server;
    constructor() {
        this.server = server
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
}

export default MemberService