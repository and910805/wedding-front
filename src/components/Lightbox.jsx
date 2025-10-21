export default function Lightbox({open, src, onClose}){
  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-2" onClick={onClose}>
      <img src={src} alt="lightbox" className="max-h-[85vh] max-w-[95vw] rounded-2xl border border-white/20" />
    </div>
  )
}
