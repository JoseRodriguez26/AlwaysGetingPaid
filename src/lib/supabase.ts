// Database types for Caliente Hub

export type Video = {
  id: string;
  title: string;
  description: string;
  price: number;
  preview_url: string;
  full_video_url: string;
  thumbnail_url: string;
  duration: string;
  published: boolean;
  created_at: string;
};

export type Purchase = {
  id: string;
  user_id: string;
  user_email: string;
  video_id: string;
  amount: number;
  payment_method: string;
  payment_reference: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type PurchaseWithVideo = Purchase & {
  videos: Video;
};
