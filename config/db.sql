Create database chicam;

create table users(
    users_id serial PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'user',
    warehouse VARCHAR,
    is_delete boolean NOT NULL DEFAULT FALSE,
    created_on date NOT NULL DEFAULT current_timestamp,
    blocked boolean NOT NULL DEFAULT FALSE
);
INSERT INTO users(username,password,role,created_on) 
VALUES ('user1','user@123#','admin',current_timestamp);

create table login(
     login_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
     username VARCHAR UNIQUE NOT NULL,
     hash VARCHAR(255) NOT NULL,
     blocked boolean NOT NULL DEFAULT FALSE
);

create table brand(
    brand_id serial PRIMARY KEY,
    brand_name VARCHAR,
     created_on date NOT NULL DEFAULT current_timestamp
);

create table vehicle(
    vehicle_id serial PRIMARY KEY,
    vehicle_name VARCHAR,
    created_on date NOT NULL DEFAULT current_timestamp 
);

create table profile(
    profile_id serial PRIMARY KEY,
    profile_name VARCHAR,
    created_on date NOT NULL DEFAULT current_timestamp 
);

create table category(
    category_id serial PRIMARY KEY,
    category VARCHAR,
    created_on date NOT NULL DEFAULT current_timestamp 
);

create table products(
    product_id serial PRIMARY KEY,
    code VARCHAR UNIQUE NOT NULL,
    size VARCHAR NOT NULL,
    price NUMERIC NOT NULL,
    quantity VARCHAR NOT NULL,
    category serial NOT NULL,                                            
    users serial NOT NULL,
    brand serial ,
    profile serial ,
    vehicle serial ,
    filepath VARCHAR(255),
    sold boolean NOT NULL DEFAULT FALSE,
    is_delete boolean NOT NULL DEFAULT FALSE,   
    created_on date NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (users) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (brand) REFERENCES brand(brand_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (profile) REFERENCES profile(profile_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (vehicle) REFERENCES vehicle(vehicle_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category) REFERENCES category(category_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table sales(
    sales_id serial PRIMARY KEY,
    sales_number VARCHAR UNIQUE,
    customer_name VARCHAR NOT NULL,
    customer_phone VARCHAR NOT NULL,
    customer_address VARCHAR NOT NULL,
    quantity VARCHAR NOT NULL,
    sales_status boolean NOT NULL DEFAULT FALSE,
    product serial NOT NULL,
    users serial NOT NULL,
    created_on date NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (users) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE
);/** FALSE = sales pending */


create table expenses(
    expenses_id serial PRIMARY KEY,
    expense VARCHAR NOT NULL,
    amount NUMERIC NOT NULL,
    users serial NOT NULL,
    created_on date NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (users) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table transfers(
    transfer_id serial PRIMARY KEY,
    quantity VARCHAR NOT NULL,
    product serial NOT NULL,
    transfer_from serial NOT NULL,
    transfer_to serial NOT NULL,
    created_on TIMESTAMP NOT NULL,
    FOREIGN KEY (product) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (transfer_from) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (transfer_to) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table  outgoingtransfers(
    transfer_id serial PRIMARY KEY,
    quantity VARCHAR NOT NULL,
    product serial NOT NULL,
    transfer_from serial NOT NULL,
    transfer_state boolean NOT NULL DEFAULT FALSE,
    created_on TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (product) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (transfer_from) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table incomingtransfers(
    transfer_id serial PRIMARY KEY,
    quantity VARCHAR NOT NULL,
    product serial NOT NULL,
    transfer_to serial NOT NULL,
    transfer_state boolean NOT NULL DEFAULT FALSE,
    transfer_from serial NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (product) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (transfer_to) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table payments(
    payment_id serial PRIMARY KEY,
    amount_paid numeric NOT NULL,
    pending_amount numeric,
    payment_status boolean NOT NULL DEFAULT FALSE,
    users serial NOT NULL,
    sales serial NOT NULL,
    created_on date NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (users) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (sales) REFERENCES sales(sales_id) ON UPDATE CASCADE ON DELETE CASCADE
);
/** FALSE = payment incomplete */
