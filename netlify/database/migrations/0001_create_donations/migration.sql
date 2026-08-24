-- Donations listed by restaurants, claimed by NGOs, moderated by admins.
CREATE TABLE IF NOT EXISTS donations (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Netlify Identity user id of the restaurant that created the listing.
  owner_id         text        NOT NULL,
  restaurant_name  text        NOT NULL,
  food_type        text        NOT NULL,
  quantity         text        NOT NULL,
  pickup_time      text        NOT NULL,
  additional_notes text,

  status           text        NOT NULL DEFAULT 'Pending'
                   CHECK (status IN ('Pending', 'Accepted', 'Rejected', 'Collected')),

  -- Identity user id of the NGO that claimed it, once claimed.
  claimed_by       text,
  claimed_by_name  text,

  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Restaurants read their own listings; NGOs and admins filter by status.
CREATE INDEX IF NOT EXISTS donations_owner_id_idx ON donations (owner_id);
CREATE INDEX IF NOT EXISTS donations_status_idx   ON donations (status);
CREATE INDEX IF NOT EXISTS donations_created_at_idx ON donations (created_at DESC);
