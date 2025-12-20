// endpoint: /api/create-user.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password, nome, role } = req.body;

  try {
    // Cria usuário no Auth
    const { data: user, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) return res.status(400).json({ error: authError.message });

    // Insere no perfil
    const { error: profileError } = await supabaseAdmin.from('profiles').insert([
      { id: user.id, nome, role }
    ]);

    if (profileError) return res.status(400).json({ error: profileError.message });

    return res.status(200).json({ success: true, userId: user.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
