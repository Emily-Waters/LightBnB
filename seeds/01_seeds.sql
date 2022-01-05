

INSERT INTO 
  users 
    (name,
    email,
    password)
  VALUES 
    ('Frodo Baggins', 'frobag@shire.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Saruman the White','robeofmanycolours@wizardcouncil.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Samwise Gamgee','potatoes@secondbreakfast.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Sauron','greatfieryeye@mountdoom.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Gandalf the Grey','conjurorofcheaptricks@wizardcouncil.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO
  properties
    (owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country, 
    street, 
    city,
    province, 
    post_code
    )
  VALUES
    (1,'Bag End','A cozy little hole in the wall...er, ground','https://static.wikia.nocookie.net/lotr/images/d/dc/Shire_dg7.jpg/revision/latest/scale-to-width-down/800?cb=20100729175751','https://static.wikia.nocookie.net/lotr/images/e/e4/Vlcsnap-2013-05-19-19h49m07s0.png/revision/latest/scale-to-width-down/1000?cb=20130519155935',30,2,2,1,'Middle Earth','1 Bagshot Row','Hobbiton Hill','Shire','PRC OUS'),
    (4,'Barad Dur','Mountain fortress with a great view in a hot climate','https://upload.wikimedia.org/wikipedia/en/6/6a/Mordor.png?1641405396791','https://static.wikia.nocookie.net/the-lords-of-the-rings/images/4/4e/Barad-Dur.jpg/revision/latest/scale-to-width-down/300?cb=20150219210551',100,20,10,5,'Middle Earth','1 Doom Lane','Gorgoroth','Mordor','GRT EYE'),
    (2,'Orthanc','Stunning view of the surrounding forests, nearby dam and impenetrable fortress wall','https://static.wikia.nocookie.net/lotr/images/b/b8/Alan_Lee_-_Orthanc.jpg/revision/latest?cb=20140526033440','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCg9HVYCAhgSB4aid6MZ0ZAC8Hu27swDmbpBZstWniJ5gSZKesTICadhVtsdkV8-TquyM&usqp=CAU',50,20,5,3,'Middle Earth','1 Isen Way','Isengard','Rohan','URK HAI');

INSERT INTO
  reservations
    (start_date,
    end_date,
    property_id,
    guest_id)
  VALUES
    ('6-1-3019','7-1-3019',2,1),
    ('6-1-3019', '7-1-3019',2,3),
    ('2-1-3019','2-2-3019',3,5);

INSERT INTO 
  property_reviews
    (guest_id,
    property_id,
    reservation_id,
    rating,
    message)
  VALUES
    (1,2,1,0,'Horrible experience, myself and my friend were tortured and nearly killed. On the way we were accosted by a giant spider. Someone needs to call pest control!'),
    (3,2,2,0,'I was out for a little stroll with my master when we were snatched up by orcs and imprisoned! The food was atrocious! If I could leave a rating lower than 0 I would!'),
    (5,3,3,0,'I was attempting to consult with the leader of my order of wizards when he imprisoned me! I was trapped on the roof and I needed to call my eagle friends to come get me out of there! Beautiful view though.');