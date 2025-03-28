import { Link } from "react-router";

export type AdCardProps = {
	id: number;
	img_url: string;
	title: string;
	price: number;
};

function AdCard({ id, img_url, title, price }: AdCardProps) {
	return (
		<div className="ad-card-container">
			<Link className="ad-card-link" to={`/ads/${id}`}>
				<img className="ad-card-image" src={img_url} alt="porte magazine" />
				<div className="ad-card-text">
					<div className="ad-card-title">{title}</div>
					<div className="ad-card-price">{price} €</div>
				</div>
			</Link>
		</div>
	);
}

export default AdCard;
