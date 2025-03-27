import axios from "axios";

const fetchCategories = async () => {
	const result = await axios.get("http://localhost:3000/categories");
	return result.data;
};

export { fetchCategories };
