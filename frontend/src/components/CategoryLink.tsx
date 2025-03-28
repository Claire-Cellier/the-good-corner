type CategoryLinkProps = {
	link: string;
	title: string;
};

import { Link } from "react-router";

function CategoryLink({ link, title }: CategoryLinkProps) {
	return (
		<Link to={link} className="category-navigation-link">
			{title}
		</Link>
	);
}

export default CategoryLink;
