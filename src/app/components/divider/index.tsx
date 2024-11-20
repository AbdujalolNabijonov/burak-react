import styled from "styled-components";
interface DividerType {
    width?: string;
    height?: string;
    bg?: string
}
const DeviderStyle = styled.span<any>`
	display: flex;
	min-width: ${({ width }) => `${width}px`};
	min-height: ${({ height }) => `${height}px`};
	background: ${({ bg }) => `${bg}`};
`

export default function Devider(props: DividerType) {
    return <DeviderStyle {...props} />
}