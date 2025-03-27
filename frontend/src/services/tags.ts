import axios from "axios";

const fetchTags = async () => {
	const result = await axios.get("http://localhost:3000/tags");
	return result.data;
};

export { fetchTags };
