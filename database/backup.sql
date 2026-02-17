--
-- PostgreSQL database dump
--

\restrict x5tlIwg34kw4mguPD7NkTNT89sB4tFwirMSTG9jdEecC7ANgD2gL2F7f26PJzVi

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    description text,
    image_url text,
    genre_id uuid,
    total_copies integer DEFAULT 1 NOT NULL,
    available_copies integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT books_check CHECK (((available_copies >= 0) AND (available_copies <= total_copies))),
    CONSTRAINT books_total_copies_check CHECK ((total_copies >= 0))
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(250) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    borrow_date date DEFAULT CURRENT_DATE NOT NULL,
    return_date date,
    status character varying(50) NOT NULL,
    user_id uuid,
    book_id uuid
);


ALTER TABLE public.loans OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(150) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(200) NOT NULL,
    password_hash text NOT NULL,
    salt text NOT NULL,
    user_role character varying(45) DEFAULT 'USER'::character varying NOT NULL,
    user_image_url text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, title, author, description, image_url, genre_id, total_copies, available_copies, created_at) FROM stdin;
1e9deb80-fcca-4528-aa81-a19016cdfc75	The Case-Book of Sherlock Holmes	Arthur Conan Doyle	No description available.	/uploads/books/book-1771293000256.jpg	2c2e5324-db56-4e05-a4ba-6f940f50d4bc	6	6	2026-02-17 02:50:00.298198
bfebc151-f03e-4684-8cab-5eb2e8de53bf	The Red Badge of Courage	Stephen Crane	No description available.	/uploads/books/book-1771293058546.jpg	530cfc8a-e6d0-4cc9-b3ab-c5af5b58cf9b	10	10	2026-02-17 02:50:58.691604
059a8f7b-b7be-4cf3-a559-90af7229af50	A Study in Scarlet	Arthur Conan Doyle	No description available.	/uploads/books/book-1771293148778.jpg	f81c005a-24bb-44fd-b146-0fed9c603531	6	6	2026-02-17 02:52:28.824215
80526c34-7025-42b5-8462-e560b5eea86e	The Castle of Otranto	Horace Walpole	No description available.	/uploads/books/book-1771293101875.jpg	69957afa-4d43-47d9-af95-f3689be04c5e	8	7	2026-02-17 02:51:42.023998
e7f0643f-b1b1-4bab-99a8-00ecb80cdc1b	Dracula	Bram Stoker	No description available.	/uploads/books/book-1771292734716.jpg	cc118ca6-aefa-497c-98c0-79d1ae2371ad	3	3	2026-02-17 02:45:34.862328
4d498deb-1ba7-493e-835e-0dc319b10d58	The Pickwick Papers	Charles Dickens	No description available.	/uploads/books/book-1771292948874.jpg	fc3e7a8f-95dc-465e-8691-72f572e3bc97	4	4	2026-02-17 02:49:08.921057
bc26db0c-911c-4848-ac05-7b4e31a07072	One, Two, Buckle My Shoe	Agatha Christie	No description available.	/uploads/books/book-1771292631729.jpg	530cfc8a-e6d0-4cc9-b3ab-c5af5b58cf9b	4	4	2026-02-17 02:43:51.886836
4ad2946a-903e-479b-84d7-3cc1387a3a51	The Secret Agent	Joseph Conrad	No description available.	/uploads/books/book-1771292836738.jpg	cc118ca6-aefa-497c-98c0-79d1ae2371ad	9	9	2026-02-17 02:47:16.781186
b89859b5-fb27-4b2f-bc63-31a985b461c3	The Murder at the Vicarage	Agatha Christie	No description available.	/uploads/books/book-1771292883727.jpg	e4b58250-031a-46f9-8b2f-5d07db052e5e	5	5	2026-02-17 02:48:03.769764
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id, name, created_at) FROM stdin;
2c2e5324-db56-4e05-a4ba-6f940f50d4bc	Science Fiction	2026-02-11 20:47:30.014651
cc118ca6-aefa-497c-98c0-79d1ae2371ad	Action	2026-02-11 22:04:50.455061
530cfc8a-e6d0-4cc9-b3ab-c5af5b58cf9b	Adventure	2026-02-13 01:00:36.535824
69957afa-4d43-47d9-af95-f3689be04c5e	Romance	2026-02-17 02:44:19.701243
f81c005a-24bb-44fd-b146-0fed9c603531	Fiction	2026-02-17 02:45:51.870081
74816c6f-5df5-4036-9878-2eac7d7ded72	Non-Fiction	2026-02-17 02:45:59.614955
fc3e7a8f-95dc-465e-8691-72f572e3bc97	Thriller	2026-02-17 02:46:18.108519
e4b58250-031a-46f9-8b2f-5d07db052e5e	Horror	2026-02-17 02:46:25.49312
\.


--
-- Data for Name: loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loans (id, borrow_date, return_date, status, user_id, book_id) FROM stdin;
10fb5b6c-e0cf-486f-8395-d69599782a67	2026-02-17	2026-02-28	borrowed	725978aa-9e3e-4a2c-a17d-1a57e2b1fdaa	80526c34-7025-42b5-8462-e560b5eea86e
f57d036a-270a-481c-9547-40312786a8ff	2026-02-17	2026-02-17	returned	c9f4042b-2569-4809-840b-e510de5d27a6	e7f0643f-b1b1-4bab-99a8-00ecb80cdc1b
a72378d2-e405-49f7-b6b1-4bfa66df19fd	2026-02-17	2026-02-17	returned	c9f4042b-2569-4809-840b-e510de5d27a6	4d498deb-1ba7-493e-835e-0dc319b10d58
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, name, email, password_hash, salt, user_role, user_image_url, created_at) FROM stdin;
cef7cd1a-fdbb-4d14-834d-f7fbaacad842	a.king	Anthony A. King	anthony.king@gmail.com	f36f4cae86c8b63b3794ac13bac53fdad7ebb0dc14b0bd84c0ef7b736cc4ef7d2a603b029db582250b69ac3118ccc8a27aff26cf0cadba4abbfe2db81dc2da12	HBQNTyIzM4ttIJ2cFc5+B0g/kQJJhYCy+/ajeHZGBoebZQfcFl2P0aAbqynNAFsBqInDAz6WtzzZruO+U8JThjNHnd0no4lYnccCHsxADebO3a44N/pIiQQigm65NgDdbyTmJZtSLiXUH1Dz7SD+n5yvddcI01lKW5n3M6Qoh9A=	user	/uploads/avatars/1771296089054.jpeg	2026-02-17 03:41:29.117418
c43a9055-204c-4dd8-8efb-9dd6e8cb7e99	john.coper	John N. Cooper	john.coper@gmail.com	52f53ef56a4568a46040aef23b60a91533a6edc8424a8d689014847c8d58428d0903e123e89c84a5e01fe83dd9e00a0cb9dad6350f2b6a3d217cd34166e1d315	JTWKX4UBUZuu/Wl5ZSkXQ+6PTaC7/uWof3F6UC3O0VmXrmsxlZO5gnE1r3aq6vkD07kodbl27cJpFZ/Usn4pCl/GyuySXcg3hVYiW58hzljB/l8lizRq+8Nce2WYP8GGIHG8pQ36Hr+VDcOXYAq4a637/7gSdXWewy9XpHWXmPw=	user	/uploads/avatars/1771296193914.jpeg	2026-02-17 03:43:13.977648
725978aa-9e3e-4a2c-a17d-1a57e2b1fdaa	james.maines	James T. Maines	james.maines@gmail.com	c6e6d75f007bfd037b92a45e23099a19b198b240c7a49a5a1f075ec0e2936daba0581e2c60074a43c3539be0c614c4576651a05039daf5ef5efb3e709357d8f4	c37Qy0e5wIKl32BZSYNqhd6ZAP5Uv7iWa4EaOIdlmKO1ZpyUIaFuqf+jCNkeWPoBdw1mK4QRi2x80IP9usGCRWrBb0Zo8PzdXS3kNXDcTV9K943J7BDJ8vwO6R6tN90C4/EIyckqB2Bx9U9R+8m5D8T+lrQfOmd1PAErtdvNnyM=	user	/uploads/avatars/1771296246487.jpeg	2026-02-17 03:44:06.557146
c9f4042b-2569-4809-840b-e510de5d27a6	frank.west	Frank S. West	frank.west62@gmail.com	079730b04d61ca97661f86f60acaff48c1ef1bade59e39474976aaa545707fc6b7af4f5b0706b97b7c469775b2ae0e69e62ab86a339217a4e5c6ceb0e1e6e7c7	28hJcEE2TkR/HgbkIsnTkBjxF0QWp3slmue0JiSPuxdJqcQLqb8CWGvkISQ7GnMAP7rAqZcwu7hfVyZrQVE6vO/dsDSmJew+AGkw9m1tBmH/s9Jp8UuMqOxIkKDdwoBvWHhxPmq0BY7IB7NWVszfb6/CrJH3vIjZ5/ch4mzaEzs=	user	/uploads/avatars/1771320924125.jpeg	2026-02-17 10:34:26.011831
26ddd8c3-2a6b-4255-abd8-bd4a019a1c53	dinostupar68	Dino Stupar	dinostupar68@gmail.com	fc78e239e8727166743ede5748254a5c9e7d7e345ad46673cd1adcd6b954b2b529351f962eb48004f1ea6d7238ee2dc5ce87e94f50f4a09b4ac9f3041088d600	l6amBxBcEtpUcl7VDLqI5bfSJPL4Q7oIvmYDtKMzdp8N4LiSL+bNjvUyaOqGyWzxj5vJrc3V3+ovD1IDduGQwil1d0XjuOqBO7k44PjFd/VvgdcIbdIb1WvLO+p8cG6OgM+EkG0nMfm7OJfti5EbSLapsWr4Yq0h/hWGvQK87z4=	admin	/uploads/avatars/1771296380186.jpg	2026-02-10 23:54:31.11726
\.


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: genres genres_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: loans loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: books books_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE SET NULL;


--
-- Name: loans loans_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: loans loans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict x5tlIwg34kw4mguPD7NkTNT89sB4tFwirMSTG9jdEecC7ANgD2gL2F7f26PJzVi

