function NewAdForm() {
	return (
		<>
			<label htmlFor="title">
				Titre de l'annonce <input type="text" name="title" />
			</label>

			<label htmlFor="description">
				Description <input type="text" name="description" />
			</label>

			<label htmlFor="owner">
				Auteur <input type="text" name="owner" />
			</label>

			<label htmlFor="prices">
				Prix <input type="number" name="price" />
			</label>

			<label htmlFor="location">
				Lieu <input type="text" name="location" />
			</label>
			<button className="button" type="submit">
				Enregistrer
			</button>
		</>
	);
}

export default NewAdForm;
