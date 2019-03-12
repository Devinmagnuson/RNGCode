CREATE TABLE IF NOT EXISTS restaurants (
    restaurant_id serial PRIMARY KEY,
    restaurant_name VARCHAR (50) UNIQUE NOT NULL,
    restaurant_hours VARCHAR (75) NOT NULL,
    restaurant_price VARCHAR (5) NOT NULL,
    restaurant_rating FLOAT,
    restaurant_latitude VARCHAR (15) NOT NULL,
    restaurant_longitude VARCHAR (15) NOT NULL,
    restaurant_alcohol VARCHAR (50)
);

INSERT INTO restaurants(restaurant_name, restaurant_hours, restaurant_price, restaurant_latitude, restaurant_longitude, restaurant_alcohol)
VALUES ('Arcana Restaurant', 'Daily 4 PM - 6 PM', '$$$', '40.016202', '-105.283347', 'beer cider wine cocktails shot'),
('The Attic Bar & Bistro', 'Mon - Sat 3 PM - 6 PM, Sun 9 PM - 2 AM', '$', '40.0162966', '-105.2828816', 'beer well draft fat albert'),
('Bohemian Biergarten', 'Mon - Fri 3 PM - 6 PM, Mon 9 PM - 1 AM', '$$', '40.0183982', '-105.2788695', 'bier beer'),
('Boulder Chophouse & Tavern', 'Daily 4 PM - 6 PM', '$$$', '40.0162303', '-105.2832073', 'draft beer wine well'),
('Brasserie Ten Ten', 'Daily 3 PM - 6:30 PM', '$$', '40.0164957', '-105.2818993', 'beer house wine cocktails'),
('Centro Mexican Kitchen', 'Mon 6 PM - 10 PM, Tue - Sun 2 PM - 6 PM, Sat - Sun 9:30 AM - 10 AM', '$$', '40.0168253', '-105.2846888', 'beer margerita wine daiquiri sangria'),
('The Corner Bar', 'Daily 3 PM - 6 PM', '$$', '40.0193406', '-105.2794309', 'cocktails wine draft beers wells'),
('Eureka!', 'Daily 2 PM - 6 PM, Daily 9 PM to 11 PM', '$$', '40.0171357', '-105.2822555', 'cocktails'),
('Hapa Sushi Grill and Sake Bar', 'Mon - Sat 2:30 PM - 5:30 PM, Thu - Sat 10 PM - 12 AM', '$$', '40.0178439', '-105.280835', 'sake beer wells cocktails')
;