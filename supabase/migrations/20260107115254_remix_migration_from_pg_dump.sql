CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text,
    excerpt text,
    featured_image text,
    category text DEFAULT 'General'::text,
    is_published boolean DEFAULT false,
    is_draft boolean DEFAULT true,
    meta_title text,
    meta_description text,
    og_title text,
    og_description text,
    og_image text,
    canonical_url text,
    keywords text[],
    schema_markup jsonb,
    view_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    published_at timestamp with time zone
);


--
-- Name: seo_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seo_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_path text NOT NULL,
    meta_title text,
    meta_description text,
    og_title text,
    og_description text,
    og_image text,
    canonical_url text,
    keywords text[],
    robots_directives text DEFAULT 'index, follow'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);


--
-- Name: seo_settings seo_settings_page_path_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_settings
    ADD CONSTRAINT seo_settings_page_path_key UNIQUE (page_path);


--
-- Name: seo_settings seo_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_settings
    ADD CONSTRAINT seo_settings_pkey PRIMARY KEY (id);


--
-- Name: blog_posts update_blog_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: seo_settings update_seo_settings_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: blog_posts Allow public delete on blog_posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public delete on blog_posts" ON public.blog_posts FOR DELETE TO authenticated, anon USING (true);


--
-- Name: seo_settings Allow public delete on seo_settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public delete on seo_settings" ON public.seo_settings FOR DELETE TO authenticated, anon USING (true);


--
-- Name: blog_posts Allow public insert on blog_posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public insert on blog_posts" ON public.blog_posts FOR INSERT TO authenticated, anon WITH CHECK (true);


--
-- Name: seo_settings Allow public insert on seo_settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public insert on seo_settings" ON public.seo_settings FOR INSERT TO authenticated, anon WITH CHECK (true);


--
-- Name: blog_posts Allow public select all blog_posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public select all blog_posts" ON public.blog_posts FOR SELECT TO authenticated, anon USING (true);


--
-- Name: blog_posts Allow public update on blog_posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public update on blog_posts" ON public.blog_posts FOR UPDATE TO authenticated, anon USING (true) WITH CHECK (true);


--
-- Name: seo_settings Allow public update on seo_settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public update on seo_settings" ON public.seo_settings FOR UPDATE TO authenticated, anon USING (true) WITH CHECK (true);


--
-- Name: seo_settings Anyone can read SEO settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can read SEO settings" ON public.seo_settings FOR SELECT USING (true);


--
-- Name: blog_posts Anyone can read published posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can read published posts" ON public.blog_posts FOR SELECT USING ((is_published = true));


--
-- Name: blog_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: seo_settings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;