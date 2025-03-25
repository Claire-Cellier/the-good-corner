type CategoryLinkProps = {
	link: string;
	title: string;
};

import "./CategoryLink.module.css";

function CategoryLink({ link, title }: CategoryLinkProps) {
	return (
		<a href={link} className="category-navigation-link">
			{title}
		</a>
	);
}

export default CategoryLink;
