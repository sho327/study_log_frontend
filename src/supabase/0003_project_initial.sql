-- =========================================
-- 1. テーブル作成 (プロジェクト系)
-- =========================================

-- プロジェクトカテゴリマスタ (m_project_category)
CREATE TABLE public.m_project_category (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    space_id uuid NOT NULL REFERENCES public.t_space(id) ON DELETE CASCADE,
    name varchar NOT NULL,
    start_date date,
    end_date date,
    icon_url text,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- プロジェクト実体 (t_project)
CREATE TABLE public.t_project (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    space_id uuid NOT NULL REFERENCES public.t_space(id) ON DELETE CASCADE,
    title varchar NOT NULL,
    description text,
    category_id uuid REFERENCES public.m_project_category(id),
    leader_id uuid REFERENCES public.t_profile(id),
    status varchar NOT NULL CHECK (status IN ('not_started', 'ongoing', 'completed', 'archived')),
    max_members integer,
    is_public boolean DEFAULT true,
    start_date date,
    end_date date,
    icon_url text,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- プロジェクト参加メンバーリレーション (r_project_member)
CREATE TABLE public.r_project_member (
    project_id uuid REFERENCES public.t_project(id) ON DELETE CASCADE,
    profile_id uuid REFERENCES public.t_profile(id) ON DELETE CASCADE,
    role varchar NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (project_id, profile_id)
);

-- プロジェクト募集要項/条件 (t_project_requirement)
CREATE TABLE public.t_project_requirement (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content text NOT NULL,
    is_required boolean DEFAULT false,
    sort_order integer DEFAULT 0,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- プロジェクト募集要項リレーション (r_project_requirement)
CREATE TABLE public.r_project_requirement (
    project_id uuid REFERENCES public.t_project(id) ON DELETE CASCADE,
    requirement_id uuid REFERENCES public.t_project_requirement(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (project_id, requirement_id)
);

-- プロジェクト使用ツール/タグ (m_project_tool)
CREATE TABLE public.m_project_tool (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    space_id uuid NOT NULL REFERENCES public.t_space(id) ON DELETE CASCADE,
    name varchar NOT NULL,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp
);

-- プロジェクト使用ツールリレーション (r_project_tool)
CREATE TABLE public.r_project_tool (
    project_id uuid REFERENCES public.t_project(id) ON DELETE CASCADE,
    tool_id uuid REFERENCES public.m_project_tool(id) ON DELETE CASCADE,
    created_at timestamp DEFAULT now(),
    created_by uuid REFERENCES public.t_profile(id),
    created_kino_id text,
    updated_at timestamp DEFAULT now(),
    updated_by uuid REFERENCES public.t_profile(id),
    updated_kino_id text,
    deleted_at timestamp,
    PRIMARY KEY (project_id, tool_id)
);

-- =========================================
-- 2. 自動更新トリガーの適用
-- =========================================
CREATE TRIGGER trg_m_project_category_updated_at BEFORE UPDATE ON public.m_project_category FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_t_project_updated_at BEFORE UPDATE ON public.t_project FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_project_member_updated_at BEFORE UPDATE ON public.r_project_member FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_t_project_requirement_updated_at BEFORE UPDATE ON public.t_project_requirement FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_project_requirement_updated_at BEFORE UPDATE ON public.r_project_requirement FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_m_project_tool_updated_at BEFORE UPDATE ON public.m_project_tool FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_r_project_tool_updated_at BEFORE UPDATE ON public.r_project_tool FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =========================================
-- 3. ビューの構築 (論理削除フィルタリング済)
-- =========================================
CREATE VIEW public.v_project_category AS SELECT * FROM public.m_project_category WHERE deleted_at IS NULL;
CREATE VIEW public.v_project AS SELECT * FROM public.t_project WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_member AS SELECT * FROM public.r_project_member WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_requirement AS SELECT * FROM public.t_project_requirement WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_requirement_relation AS SELECT * FROM public.r_project_requirement WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_tool AS SELECT * FROM public.m_project_tool WHERE deleted_at IS NULL;
CREATE VIEW public.v_project_tool_relation AS SELECT * FROM public.r_project_tool WHERE deleted_at IS NULL;
