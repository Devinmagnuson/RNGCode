CREATE TABLE IF NOT EXISTS restaurants (
    restaurant_id serial PRIMARY KEY,
    restaurant_name VARCHAR (50) UNIQUE NOT NULL,
    restaurant_open_time VARCHAR (4) NOT NULL,
    restaurant_close_time VARCHAR (4) NOT NULL,
    restaurant_open_day VARCHAR (75) NOT NULL,
    restaurant_price VARCHAR (5) NOT NULL,
    restaurant_rating NUMERIC (4, 3),
    restaurant_address VARCHAR (75) NOT NULL,
    restaurant_alcohol VARCHAR (50),
    restaurant_food VARCHAR (50)
);

INSERT INTO restaurants(restaurant_name, restaurant_open_time, restaurant_close_time, restaurant_open_day, restaurant_price, restaurant_address, restaurant_alcohol, restaurant_food)
VALUES ('Arcana Restaurant', '1600', '2200', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$$', '909 Walnut Street, Boulder, CO', 'beer cider wine cocktails shot', 'new american'),
('The Attic Bar & Bistro', '1100', '0200', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$', '949 Walnut Street, Boulder, CO', 'beer well draft fat albert', 'american comfort'),
('Bohemian Biergarten', '1500', '0100', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$', '2017 13th St, Boulder, CO', 'bier beer', 'czech'),
('Boulder Chophouse & Tavern', '1600', '2200', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$$', '921 Walnut St, Boulder, CO', 'draft beer wine well', 'steakhouse american'),
('Brasserie Ten Ten', '1100', '2200', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$', '1011 Walnut St, Boulder, CO', 'beer house wine cocktails', 'french brunch'),
('Centro Mexican Kitchen', '0730', '2200', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$', '950 Pearl St, Boulder, CO', 'beer margerita wine daiquiri sangria', 'mexican latin'),
('The Corner Bar', '1100', '0000', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$', '2115 13th St, Boulder, CO', 'cocktails wine draft beers wells', 'american grill'),
('Eureka!', '1100', '2300', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$', '1048 Pearl St, Boulder, CO', 'cocktails', 'american'),
('Hapa Sushi Grill and Sake Bar', '1100', '2200', 'MON, TUES, WED, THUR, FRI, SAT, SUN', '$$', '1117 Pearl St, Boulder, CO', 'sake beer wells cocktails', 'japanese asian sushi hawaiian')
;
