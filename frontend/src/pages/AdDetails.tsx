import { useParams } from "react-router";

function AdDetails() {
	const { id } = useParams();
	return <p>Details of ad {id}</p>;
}

export default AdDetails;
