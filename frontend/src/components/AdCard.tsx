import "./AdCard.module.css";

type AdCardProps = {
	image: string;
	title: string;
	price: number;
	link: string;
};

function AdCard({ image, title, price, link }: AdCardProps) {
	return (
		<div className="ad-card-container">
			<a className="ad-card-link" href={link}>
				<img className="ad-card-image" src={image} alt="porte magazine" />
				<div className="ad-card-text">
					<div className="ad-card-title">{title}</div>
					<div className="ad-card-price">{price} €</div>
				</div>
			</a>
		</div>
	);
}

export default AdCard;
