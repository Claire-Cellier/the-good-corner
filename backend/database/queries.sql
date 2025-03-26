-- SQLite
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS ad_tag;

PRAGMA foreign_keys = ON;

CREATE TABLE category
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title VARCHAR(100) NOT NULL
);

CREATE TABLE ad 
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
  img_url VARCHAR(100),
  location VARCHAR(100),
	categoryID INT NOT NULL,
	createdAt DATE,
	FOREIGN KEY (categoryID) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE tag
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title VARCHAR(100) NOT NULL
);

CREATE TABLE ad_tag (
	tagID INT NOT NULL,
	adID INT NOT NULL,
 PRIMARY KEY (adID, tagID),
 FOREIGN KEY (adID) REFERENCES ad(id) ON DELETE CASCADE,
 FOREIGN KEY (tagID) REFERENCES tag(id) ON DELETE CASCADE
);

INSERT INTO category (title) VALUES
('autre'), ('vehicule'), ('hifi');

INSERT INTO tag (title) VALUES 
('neuf'), ('soldé');

INSERT INTO ad (title, description, owner, price, img_url, location, createdAt, categoryID) VALUES
('iPhone 13 Pro 128 Go - Très bon état', 'iPhone 13 Pro bleu, 128 Go, en excellent état, vendu avec sa boîte et son chargeur.', 'Sophie Martin', 750, 'iphone13.jpg', 'Paris', '2024-03-10', 1),
('Vélo de ville Nakamura', 'Vélo de ville Nakamura en bon état, léger et pratique pour les déplacements urbains.', 'Julien Durand', 150, 'velo_nakamura.jpg', 'Bordeaux', '2024-03-08', 2),
('Canapé convertible 3 places', 'Canapé gris en tissu, convertible en lit, idéal pour un studio ou un salon cosy.', 'Camille Lefebvre', 250, 'canape_convertible.jpg', 'Lyon', '2024-03-12', 1),
('PlayStation 5 avec 2 manettes', 'PS5 en excellent état avec deux manettes et le jeu FIFA 23 inclus.', 'Antoine Bernard', 500, 'ps5.jpg', 'Paris', '2024-03-14', 1),
('Table en bois massif + 4 chaises', 'Ensemble table en bois massif et 4 chaises en bon état. À venir récupérer sur place.', 'Laura Moreau', 200, 'table_bois.jpg', 'Bordeaux', '2024-03-07', 1),
('MacBook Air M1 - 256 Go', 'MacBook Air M1 acheté en 2022, fonctionne parfaitement, vendu avec chargeur.', 'Pierre Richard', 850, 'macbook_air.jpg', 'Lyon', '2024-03-09', 1),
('Guitare acoustique Fender', 'Belle guitare acoustique Fender, sonorité impeccable, idéale pour débutants et confirmés.', 'Clara Dubois', 180, 'guitare_fender.jpg', 'Paris', '2024-03-11', 1),
('Lampe industrielle vintage', 'Lampe industrielle en métal noir, parfaite pour une déco loft ou rétro.', 'Nicolas Thomas', 50, 'lampe_indus.jpg', 'Bordeaux', '2024-03-06', 1),
('Trottinette électrique Xiaomi', 'Trottinette électrique Xiaomi M365 en bon état, autonomie 25 km.', 'Manon Lefevre', 300, 'trottinette_xiaomi.jpg', 'Lyon', '2024-03-13', 2),
('Lot de BD Marvel et DC Comics', 'Lot de 10 BD Marvel et DC Comics en parfait état, idéal pour collectionneur.', 'Théo Marchand', 90, 'bd_marvel_dc.jpg', 'Paris', '2024-03-08', 1),
('Machine à café Nespresso', 'Machine à café Nespresso avec mousseur de lait inclus.', 'Sarah Perrin', 70, 'nespresso.jpg', 'Bordeaux', '2024-03-05', 1),
('Montre connectée Samsung Galaxy Watch 4', 'Montre connectée Samsung Galaxy Watch 4 en excellent état, bracelet noir.', 'Lucas Girard', 120, 'galaxy_watch.jpg', 'Lyon', '2024-03-12', 1),
('Meuble TV en bois foncé', 'Meuble TV moderne en bois foncé avec rangement intégré.', 'Pauline Roussel', 130, 'meuble_tv.jpg', 'Paris', '2024-03-07', 1),
('Pack Nintendo Switch + Zelda', 'Nintendo Switch en excellent état avec Zelda Breath of the Wild.', 'Damien Leroy', 280, 'switch_zelda.jpg', 'Bordeaux', '2024-03-11', 1),
('Sac à dos de randonnée 50L', 'Sac à dos de randonnée 50L imperméable, idéal pour les treks et voyages.', 'Julie Vasseur', 60, 'sac_rando.jpg', 'Lyon', '2024-03-10', 1),
('Lot de vinyles rock et jazz', 'Collection de 20 vinyles de rock et jazz, très bon état.', 'Émile Dufour', 150, 'vinyles_rock_jazz.jpg', 'Paris', '2024-03-14', 1),
('Bureau en bois clair + chaise', 'Bureau en bois clair avec tiroirs et chaise assortie.', 'Claire Fontaine', 180, 'bureau_bois.jpg', 'Bordeaux', '2024-03-06', 1),
('Enceinte Bluetooth JBL Charge 5', 'Enceinte Bluetooth JBL Charge 5, étanche, excellente qualité sonore.', 'Vincent Rolland', 100, 'jbl_charge5.jpg', 'Lyon', '2024-03-08', 3),
('Robe de soirée rouge (taille M)', 'Robe de soirée élégante, portée une seule fois, taille M.', 'Marion Deschamps', 40, 'robe_soiree.jpg', 'Paris', '2024-03-10', 1),
('Four à micro-ondes Samsung', 'Micro-ondes Samsung 20L, parfait état, vendu avec mode d’emploi.', 'Thomas Benoît', 80, 'microondes_samsung.jpg', 'Bordeaux', '2024-03-09', 1);

INSERT INTO ad_tag (adID, tagID) VALUES
(1, 1), (1, 2), (2, 1), (2, 2), (3, 1), (3, 2),(4, 1), (4, 2),(5, 1), (5, 2),(6, 1), (6, 2), (7, 1), (7, 2),(8, 1), (8, 2), (9, 1), (9, 2), (10, 1), (10, 2), (11, 1), (11, 2), (12, 1), (12, 2), (13, 1), (13, 2), (14, 1), (14, 2), (15, 1), (15, 2), (16, 1), (16, 2), (17, 1), (17, 2), (18, 1), (18, 2), (19, 1), (19, 2), (20, 1), (20, 2);

-- SELECT * FROM ad ;
-- SELECT * FROM ad WHERE location = "Bordeaux";
-- DELETE * FROM ad WHERE price > 200;
-- UPDATE ad SET price = 0 WHERE createdAt = '2024-03-08';
-- SELECT AVG(price) FROM ad WHERE location = "Paris";
-- SELECT AVG(price) FROM ad GROUP BY location;