import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { Ad } from "../types/Ad";
import type { Tag } from "../types/Tag";
import { fetchAd } from "../services/ads";

function AdDetails() {
	const { id } = useParams();
	const [ad, setAd] = useState<Ad>();
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) return;
		const getAd = async () => {
			const data = await fetchAd(id);
			setAd(data);
		};
		getAd();
	}, [id]);

	const deleteAd = async () => {
		await axios.delete(`http://localhost:3000/ads/${id}`);
		navigate("/");
	};

	const updateAd = () => {
		navigate(`/ads/edit/${id}`);
	};

	if (!ad) return <p>Sorry, can't find this ad</p>;

	return (
		<main className="main-content">
			<h2 className="ad-details-title">{ad.title}</h2>
			<section className="ad-details">
				<div className="ad-details-image-container">
					<img className="ad-details-image" src={ad.img_url} alt={ad.title} />
				</div>
				<div className="ad-details-info">
					<div className="ad-details-price">{ad.price} €</div>
					<div className="ad-details-description">{ad.description}</div>
					<hr className="separator" />
					<div className="ad-details-owner">
						Annoncée publiée par <b>{ad?.owner}</b> le {ad.createdAt}.
					</div>
					<div className="ad-details-description">
						{ad.tags.map((tag: Tag) => (
							<p key={tag.id}>{tag.title}</p>
						))}
					</div>
					<a
						href="mailto:serge@serge.com"
						className="button button-primary link-button"
					>
						<svg
							aria-hidden="true"
							width="16"
							height="16"
							viewBox="0 0 32 32"
							xmlns="http://www.w3.org/2000/svg"
							className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
							stroke="currentcolor"
							strokeWidth="2.5"
							fill="none"
						>
							<path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z" />
						</svg>
						Envoyer un email
					</a>
				</div>
			</section>
			<button type="button" className="button" onClick={deleteAd}>
				Delete this ad
			</button>
			<button type="button" className="button" onClick={updateAd}>
				Update this ad
			</button>
		</main>
	);
}

export default AdDetails;
