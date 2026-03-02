export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      affiliate_domains: {
        Row: {
          affiliate_id: string
          created_at: string
          domain: string
          id: string
          tracking_enabled: boolean
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          created_at?: string
          domain: string
          id?: string
          tracking_enabled?: boolean
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          created_at?: string
          domain?: string
          id?: string
          tracking_enabled?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_domains_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_email: string
          affiliate_name: string
          application_date: string | null
          approved_date: string | null
          commission_rate: number | null
          company: string | null
          created_at: string
          id: string
          notes: string | null
          referral_code: string
          signup_date: string
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_email: string
          affiliate_name: string
          application_date?: string | null
          approved_date?: string | null
          commission_rate?: number | null
          company?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          referral_code: string
          signup_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_email?: string
          affiliate_name?: string
          application_date?: string | null
          approved_date?: string | null
          commission_rate?: number | null
          company?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          referral_code?: string
          signup_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          metadata: Json | null
          resource: string
          resource_id: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource: string
          resource_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource?: string
          resource_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          categories: string[] | null
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          featured_image_alt: string | null
          gallery_images: Json | null
          id: string
          linkedin_handles: string[] | null
          publish_date: string | null
          read_time: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          social_embeds: Json | null
          status: string
          title: string
          twitter_handles: string[] | null
          updated_at: string
        }
        Insert: {
          author?: string
          categories?: string[] | null
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          gallery_images?: Json | null
          id?: string
          linkedin_handles?: string[] | null
          publish_date?: string | null
          read_time?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          social_embeds?: Json | null
          status?: string
          title: string
          twitter_handles?: string[] | null
          updated_at?: string
        }
        Update: {
          author?: string
          categories?: string[] | null
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          gallery_images?: Json | null
          id?: string
          linkedin_handles?: string[] | null
          publish_date?: string | null
          read_time?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          social_embeds?: Json | null
          status?: string
          title?: string
          twitter_handles?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      case_study_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          preview_image: string | null
          sort_order: number | null
          template_content: string
          template_variables: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          preview_image?: string | null
          sort_order?: number | null
          template_content: string
          template_variables?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          preview_image?: string | null
          sort_order?: number | null
          template_content?: string
          template_variables?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_freshness_tracking: {
        Row: {
          created_at: string | null
          freshness_score: number | null
          id: string
          last_reviewed_date: string | null
          needs_update: boolean | null
          post_id: string | null
          update_suggestions: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          freshness_score?: number | null
          id?: string
          last_reviewed_date?: string | null
          needs_update?: boolean | null
          post_id?: string | null
          update_suggestions?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          freshness_score?: number | null
          id?: string
          last_reviewed_date?: string | null
          needs_update?: boolean | null
          post_id?: string | null
          update_suggestions?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_freshness_tracking_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_rate_limits: {
        Row: {
          attempt_count: number | null
          blocked_until: string | null
          first_attempt_at: string | null
          id: string
          ip_address: string
          last_attempt_at: string | null
        }
        Insert: {
          attempt_count?: number | null
          blocked_until?: string | null
          first_attempt_at?: string | null
          id?: string
          ip_address: string
          last_attempt_at?: string | null
        }
        Update: {
          attempt_count?: number | null
          blocked_until?: string | null
          first_attempt_at?: string | null
          id?: string
          ip_address?: string
          last_attempt_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          consent: boolean
          created_at: string
          email: string
          id: string
          ip: string | null
          name: string | null
          source: string | null
          user_agent: string | null
        }
        Insert: {
          consent?: boolean
          created_at?: string
          email: string
          id?: string
          ip?: string | null
          name?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Update: {
          consent?: boolean
          created_at?: string
          email?: string
          id?: string
          ip?: string | null
          name?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      referral_stats: {
        Row: {
          affiliate_id: string
          commission_earned: number | null
          created_at: string
          id: string
          last_referral_date: string | null
          successful_referrals: number | null
          total_referrals: number | null
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          commission_earned?: number | null
          created_at?: string
          id?: string
          last_referral_date?: string | null
          successful_referrals?: number | null
          total_referrals?: number | null
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          commission_earned?: number | null
          created_at?: string
          id?: string
          last_referral_date?: string | null
          successful_referrals?: number | null
          total_referrals?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_stats_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: true
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          approved: boolean | null
          approved_at: string | null
          approved_by: string | null
          commission_amount: number | null
          created_at: string
          id: string
          notes: string | null
          referral_date: string
          referral_method: string | null
          referred_user_email: string
          referred_user_name: string
          referrer_code: string | null
          referrer_domain: string | null
          referrer_email: string | null
          referrer_name: string
          source_domain: string | null
          status: string
        }
        Insert: {
          approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          commission_amount?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          referral_date?: string
          referral_method?: string | null
          referred_user_email: string
          referred_user_name: string
          referrer_code?: string | null
          referrer_domain?: string | null
          referrer_email?: string | null
          referrer_name: string
          source_domain?: string | null
          status?: string
        }
        Update: {
          approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          commission_amount?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          referral_date?: string
          referral_method?: string | null
          referred_user_email?: string
          referred_user_name?: string
          referrer_code?: string | null
          referrer_domain?: string | null
          referrer_email?: string | null
          referrer_name?: string
          source_domain?: string | null
          status?: string
        }
        Relationships: []
      }
      think_tank_conversations: {
        Row: {
          ai_response: string
          created_at: string
          id: string
          ip_address: string | null
          service_suggested: string[] | null
          session_id: string
          user_message: string
        }
        Insert: {
          ai_response: string
          created_at?: string
          id?: string
          ip_address?: string | null
          service_suggested?: string[] | null
          session_id: string
          user_message: string
        }
        Update: {
          ai_response?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          service_suggested?: string[] | null
          session_id?: string
          user_message?: string
        }
        Relationships: []
      }
      think_tank_rate_limits: {
        Row: {
          first_message_at: string
          id: string
          ip_address: string
          last_message_at: string
          message_count: number
        }
        Insert: {
          first_message_at?: string
          id?: string
          ip_address: string
          last_message_at?: string
          message_count?: number
        }
        Update: {
          first_message_at?: string
          id?: string
          ip_address?: string
          last_message_at?: string
          message_count?: number
        }
        Relationships: []
      }
      webmentions: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          post_id: string | null
          response_code: number | null
          sent_at: string | null
          source_url: string
          status: string | null
          target_url: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          post_id?: string | null
          response_code?: number | null
          sent_at?: string | null
          source_url: string
          status?: string | null
          target_url: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          post_id?: string | null
          response_code?: number | null
          sent_at?: string | null
          source_url?: string
          status?: string | null
          target_url?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webmentions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_newsletter_rate_limit: {
        Args: { client_ip: string }
        Returns: boolean
      }
      cleanup_newsletter_rate_limits: { Args: never; Returns: undefined }
      generate_referral_code: { Args: never; Returns: string }
      generate_slug: { Args: { title: string }; Returns: string }
      get_content_age_days: { Args: { reviewed_date: string }; Returns: number }
      is_admin_user: { Args: { check_email: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
