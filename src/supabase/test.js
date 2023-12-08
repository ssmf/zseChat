import supabase from "./index.js";

const x = await supabase.channel('asdad').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'userIds' },
(payload) => {
    renderMessage(payload.new)
    }
).subscribe()

x.unsubscribe()

console.log(supabase.getChannels())