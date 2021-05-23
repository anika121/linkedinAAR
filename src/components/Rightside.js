import styled from 'styled-components';

const Rightside = (props) => {
	return (
		<Container>
			Hello From Rightside
		</Container>
	)
}

const Container = styled.div`
	grid-area: rightside;
`;

export default Rightside;