import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageContainer from '@/components/layout/pageContainer'
import PageHeader from '@/components/layout/pageHeader'
import SignOutButton from '@/components/layout/signOutButton'
import { createClient } from '@/lib/supabase/server'



export default async function DashboardPage() {
  const supabase = await createClient()
  const { data : { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Dashboard sedang dalam pembangunan."
        action={<SignOutButton />}
      />
 
      <div className="mt-8 max-w-md space-y-6">
 
        {/* Welcome message */}
        <p className="text-lg font-medium text-blue-600">
          Selamat datang, {user.email}!
        </p>
 
        {/* Info akun */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Info Akun
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="text-sm font-mono text-foreground break-all">{user.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Terakhir login</p>
              <p className="text-sm text-foreground">
                {new Date(user.last_sign_in_at ?? '').toLocaleString('id-ID', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </p>
            </div>
          </CardContent>
        </Card>
 
      </div>
    </PageContainer>
  )
}