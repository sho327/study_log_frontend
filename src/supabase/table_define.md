## データベース設計定義

### ■ データ設計の基本方針：マスタとトランザクションの分離

本システムでは、データの整合性と拡張性を保つため、  
データを**「マスタ」**と**「トランザクション」**に明確に分けて定義します。

#### 1. マスタデータ（M）

システム全体、またはプロジェクト内で「共通の選択肢」や「設定」として使われるデータです。

* **特徴:** データの追加・変更頻度が低く、他のテーブルから参照（FK）される側になります。
* **メリット:** 表記揺れを防ぎ、統計（どのカテゴリが何件あるか等）を正確に出せるようになります。

#### 2. トランザクションデータ（T）

日々の運用（ユーザーの操作）によって発生し、蓄積されていく実体データです。

* **特徴:** 作成・更新・削除の頻度が高く、業務の「履歴」や「事実」を記録します。
* **メリット:** データの増大に合わせて、古いデータのアーカイブやパーテーション分割（負荷分散）がしやすくなります。

---

### ■ マスタ / トランザクション 分類一覧

| 分類 | 物理名 | テーブル名 | 役割 |
| --- | --- | --- | --- |
| **1. ユーザー** | `t_profile` | プロフィール | ユーザーの基本情報（Auth拡張） |
|  | `m_profile_skill_tag` | スキルタグマスタ | スキル名称の定義 |
|  | `r_profile_skill_tag` | スキルリレーション | ユーザーとスキルの紐付け |
| **2. スペース** | `t_space` | スペース | 組織・コミュニティの実体 |
|  | `r_space` | スペースリレーション | スペース参加者と権限の管理 |
| **3. プロジェクト** | `t_project` | プロジェクト | プロジェクトの実体 |
|  | `m_project_category` | プロジェクトカテゴリ | プロジェクト種別の定義 |
|  | `r_project_member` | メンバーリレーション | プロジェクト参加者と権限の管理 |
|  | `m_project_tool` | ツールマスタ | プロジェクトで使用するツールの定義 |
|  | `r_project_tool` | ツールリレーション | プロジェクトとツールの紐付け |
|  | `t_project_requirement` | 募集要項 | 募集条件の内容（箇条書き実体） |
|  | `r_project_requirement` | 募集要項リレーション | プロジェクトと募集条件の紐付け |
| **4. タスク設定** | `m_project_task_category` | タスクカテゴリ | 開発・設計等の種別定義 |
|  | `r_project_task_category` | カテゴリリレーション | プロジェクトへのカテゴリ割り当て |
|  | `m_project_task_status` | タスクステータス | 未対応・完了等の状態定義 |
|  | `r_project_task_status` | ステータスリレーション | プロジェクトへの状態フロー割り当て |
| **5. タスク実体** | `t_task` | タスク | タスクのメインデータ |
|  | `r_task_assignee` | 担当者リレーション | タスクと担当者の紐付け |
|  | `t_task_attachment` | 添付ファイル | アップロードされたファイル情報 |
|  | `r_task_attachment` | ファイルリレーション | タスクとファイルの紐付け |
| **6. 通知** | `t_notification` | 通知 | 発生したお知らせの履歴 |
|  | `t_notification_read` | 通知既読 | ユーザーごとの既読管理 |

#### 補足：リレーションテーブル（交差テーブル）

マスタとトラン、あるいはトラン同士を「多対多」で結びつけるためのテーブルです  
（例：`r_task_assignee`）。  
これらはトランザクションの一種として扱い、誰が・いつ・何に紐付いたかを記録します。

### 1. ユーザー/プロフィール系

ユーザー本体は Supabase Auth (`auth.users`) を参照します。

#### ■ t_profile (プロフィールトラン)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK, FK | `auth.users.id` 参照 |
| user_name | varchar | NOT NULL | ユーザー名(UNIQUE/アプリ内でユーザ検索等で使用) |
| display_name | varchar | NOT NULL | 表示名 |
| affiliation | text |  | 所属 (例: 〇〇大学 3年) |
| bio | text |  | 詳細・自己紹介 |
| avatar_url | text |  | アイコンURL |
| is_setup_completed | boolean |  | 初回セットアップ完了フラグ |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `auth.users.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `auth.users.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ m_profile_skill_tag (プロフィールスキルタグマスタ)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | タグID |
| name | varchar | NOT NULL, Unique | タグ名 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_profile_skill_tag (プロフィールスキルタグリレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| profile_id | uuid | PK, FK | `t_profile.id` 参照 |
| skill_tag_id | uuid | PK, FK | `m_profile_skill_tag.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

---

### 2. スペース系

組織やコミュニティの単位です。

#### ■ t_space (スペーストラン)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | スペースID |
| display_name | varchar | NOT NULL | 表示名 |
| description | text |  | 詳細 |
| owner_id | uuid | FK | `t_profile.id` 参照 |
| is_personal | boolean | DEFAULT false | 個人スペースフラグ |
| avatar_url | text |  | アイコンURL |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_space (スペースリレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| profile_id | uuid | PK, FK | `t_profile.id` 参照 |
| space_id | uuid | PK, FK | `t_space.id` 参照 |
| role | varchar | NOT NULL | 権限 (owner, admin, member) |
| status | varchar | NOT NULL | 状態 (active, inviting, left) |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

---

### 3. プロジェクト系

スペース内に作成されるプロジェクト単位です。

#### ■ t_project (プロジェクトトラン)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | プロジェクトID |
| space_id | uuid | FK | `t_space.id` 参照 |
| title | varchar | NOT NULL | タイトル |
| description | text |  | 詳細 |
| category_id | uuid | FK | `m_project_category.id` 参照 |
| leader_id | uuid | FK | `t_profile.id` 参照 |
| status | varchar |  | 状態 (not_started, ongoing, completed, archived) |
| max_members | integer |  | 参加メンバー上限数 |
| is_public | boolean |  | 公開フラグ (true: 全員, false: 参加者のみ) |
| start_date | date |  | 開始予定日 |
| end_date | date |  | 終了予定日 |
| icon_url | text |  | アイコンURL |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ m_project_category (プロジェクトカテゴリマスタ)

※RLSで制御は行わないが、スペース内で選択できるマスタとする。  
=>スペースIDを設定し、スペース内で設定した範囲の中から選択してもらうようにしておく

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | カテゴリID |
| space_id | uuid | FK | `t_space.id` 参照 |
| name | varchar | NOT NULL | カテゴリ名 (Web開発等) |
| start_date | date |  | 開始予定日 |
| end_date | date |  | 終了予定日 |
| icon_url | text |  | アイコンURL |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_project_member (プロジェクト参加メンバーリレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| project_id | uuid | PK, FK | `t_project.id` 参照 |
| profile_id | uuid | PK, FK | `t_profile.id` 参照 |
| role | varchar | NOT NULL | 権限 (owner, admin, member, viewer) |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ t_project_requirement (プロジェクト募集要項/条件)

※箇条書きのように常に募集要項を生成していくトランとする。  

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | 要項ID |
| content | text | NOT NULL | 要項内容 |
| is_required | boolean |  | 必須フラグ |
| sort_order | integer |  | 並び順 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_project_requirement (プロジェクト募集要項リレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| project_id | uuid | PK, FK | `t_project.id` 参照 |
| requirement_id | uuid | PK, FK | `t_project_requirement.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ m_project_tool (プロジェクト使用ツール/タグ)

※RLSで制御は行わないが、スペース間でタグが生成され、選択や新規作成が行えるようにする。  
=>スペースIDを設定し、スペース内でプロジェクト作成時に探せるようにしておく

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | ツールID |
| space_id | uuid | FK | `t_space.id` 参照 |
| name | varchar | NOT NULL | ツール名 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_project_tool (プロジェクト使用ツールリレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| project_id | uuid | PK, FK | `t_project.id` 参照 |
| tool_id | uuid | PK, FK | `m_project_tool.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

---

### 4. タスク・ステータス設定系

プロジェクトごとにカスタマイズ可能なタスク設定です。

#### ■ m_project_task_category (プロジェクトタスクカテゴリ)

※プロジェクト内でカテゴリが生成され、タスク作成時に選択が行えるようにする。  
=>プロジェクトIDを設定し、プロジェクト内で設定した範囲の中から選択してもらうようにしておく

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | カテゴリID |
| project_id | uuid | FK | `t_project.id` 参照 |
| name | varchar | NOT NULL | カテゴリ名 (開発、設計等) |
| sort_order | integer |  | 並び順 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_project_task_category (プロジェクトタスクカテゴリリレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| project_id | uuid | PK, FK | `t_project.id` 参照 |
| category_id | uuid | PK, FK | `m_project_task_category.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ m_project_task_status (プロジェクトタスクステータス)

※プロジェクト内でステータスが生成され、タスク作成時に選択が行えるようにする。  
=>プロジェクトIDを設定し、プロジェクト内で設定した範囲の中から選択してもらうようにしておく

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | ステータスID |
| name | varchar | NOT NULL | 状態名 (未対応、着手中等) |
| sort_order | integer |  | 並び順 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_project_task_status (プロジェクトタスクステータスリレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| project_id | uuid | PK, FK | `t_project.id` 参照 |
| status_id | uuid | PK, FK | `m_project_task_status.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

---

### 5. タスク本体(添付ファイル)

#### ■ t_task (タスクトラン)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | タスクID |
| project_id | uuid | FK | `t_project.id` 参照 |
| title | varchar | NOT NULL | タイトル |
| description | text |  | 詳細 |
| priority | varchar |  | 優先度 (low, medium, high) |
| main_assignee_id | uuid | FK | 主担当者 (`t_profile.id`) |
| reviewer_id | uuid | FK | レビュアー (`t_profile.id`) |
| category_rel_id | uuid | FK | `r_project_task_category.id` |
| status_rel_id | uuid | FK | `r_project_task_status.id` |
| plan_start_at | timestamp |  | 作業開始予定日 |
| plan_end_at | timestamp |  | 作業終了予定日 |
| actual_start_at | timestamp |  | 作業開始実績日 |
| actual_end_at | timestamp |  | 作業終了実績日 |
| estimated_hours | numeric |  | 予定工数 |
| actual_hours | numeric |  | 実績工数 |
| sort_order | integer |  | 同一カテゴリ内の並び順 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_task_assignee (タスク担当者リレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| task_id | uuid | PK, FK | `t_task.id` 参照 |
| profile_id | uuid | PK, FK | `t_profile.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ t_task_attachment (タスク添付ファイル)

※添付ファイル毎にデータを生成していくトランとする。  

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | ファイルID |
| file_url | text | NOT NULL | 添付ファイルURL |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ r_task_attachment (タスク添付ファイルリレーション)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| task_id | uuid | PK, FK | `t_task.id` 参照 |
| attachment_id | uuid | PK, FK | `t_task_attachment.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

---

### 6. お知らせ/通知系

スペース/プロジェクト毎に作成されるお知らせ情報の管理トランです。

#### ■ t_notification (通知トラン)

target_(space/project/profile)_idの値によってどのスペース、プロジェクト宛か判定  
=>全てがnullの場合、システムからの通知と判定させる

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | uuid | PK | 通知ID |
| type | varchar |  | 種別 (system, project, task等) |
| title | varchar | NOT NULL | タイトル |
| description | text |  | 詳細 |
| target_space_id | uuid | FK | `t_space.id` 参照 または null |
| target_project_id | uuid | FK | `t_project.id` 参照 または null |
| target_profile_id | uuid | FK | `t_profile.id` 参照 または null |
| parameters | jsonb |  | パラメータ (遷移先ID/パス等) |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |

#### ■ t_notification_read (通知既読トラン)

| カラム名 | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| notification_id | uuid | PK, FK | `t_notification.id` 参照 |
| created_at | timestamp |  | 作成日(DEFAULT now()) |
| created_by | uuid | PK, FK | `t_profile.id` 参照 |
| created_kino_id | text |  | 作成機能ID |
| updated_at | timestamp |  | 更新日(DEFAULT now()) |
| updated_by | uuid | PK, FK | `t_profile.id` 参照 |
| updated_kino_id | text |  | 更新機能ID |
| deleted_at | timestamp |  | 削除日 |
