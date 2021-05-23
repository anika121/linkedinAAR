import styled from 'styled-components';

const Main = (props) => {
	return (
		<Container>
			Hello From main
		</Container>
	)
}

const Container = styled.div`
	grid-area: main;
`;

export default Main;