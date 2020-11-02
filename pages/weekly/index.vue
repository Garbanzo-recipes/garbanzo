<script>
import { format } from 'date-fns'

export default {
  fetch({ redirect }) {
    redirect(301, `/weekly/${format(new Date(), "yyyy-'W'II")}`)
  },
}
</script>
