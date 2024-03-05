CREATE TABLE "User"(
    id SERIAL NOT NULL,
    created_at timestamp with time zone,
    modified_at timestamp with time zone,
    status text DEFAULT '100_ACTIVATED'::text,
    activated_at timestamp with time zone,
    last_login_at timestamp with time zone,
    phone text,
    PRIMARY KEY(id)
);

CREATE TABLE "UserIdentifier"(
    id SERIAL NOT NULL,
    created_at timestamp with time zone,
    modified_at timestamp with time zone,
    scheme text DEFAULT 'username'::text,
    provider text DEFAULT 'VANI_HERO'::text,
    identifier text,
    verified boolean DEFAULT false,
    details jsonb,
    user_id integer,
    PRIMARY KEY(id)
);

CREATE TABLE "UserCredential"(
    id SERIAL NOT NULL,
    created_at timestamp with time zone,
    modified_at timestamp with time zone,
    scheme text DEFAULT 'basic'::text,
    provider text DEFAULT 'VANI_HERO'::text,
    credential text,
    details jsonb,
    user_id integer,
    PRIMARY KEY(id)
);


CREATE TABLE "Question"(
    id SERIAL NOT NULL,
    created_at timestamp with time zone,
    modified_at timestamp with time zone,
    hint text,
    content text,
    is_multiple boolean,
    PRIMARY KEY(id)
);

CREATE TABLE "Answer"(
    id SERIAL NOT NULL,
    created_at timestamp with time zone,
    modified_at timestamp with time zone,
    is_correct boolean,
    question_id integer,
    PRIMARY KEY(id)
);
