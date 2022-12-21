import { RotatingLines } from 'react-loader-spinner';
import { Container } from './Loader.styled';

export const Loader = () => {
	return (
		<Container>
			<RotatingLines
		strokeColor="grey"
		strokeWidth="5"
		animationDuration="0.75"
		width="50"
		visible={true}
	/>
		</Container>
	);
}