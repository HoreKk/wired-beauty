<script>

export default {
  name: 'DashboardPage',
  layout: 'dashboard',
  middleware: 'auth',
  asyncData({ redirect }) {
    redirect('/dashboard/users')
  }
}
</script>
