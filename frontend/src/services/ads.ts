import axios from "axios";

const fetchAd = async (id: string) => {
	const result = await axios.get(`http://localhost:3000/ads/${id}`);
	return result.data;
};

export { fetchAd };
