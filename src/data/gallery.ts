/**
 * "Our work" gallery — real project photographs supplied by RG Ramu Glass House.
 * To add a photo: export it as WebP (about 1400px on the long side, metadata stripped) into
 * public/media/work/, then add an entry here with its real width and height.
 */
export type GalleryImage = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export const gallery: GalleryImage[] = [
  {
    src: '/media/work/wood-finish-ceiling-panels-house-frontage.webp',
    width: 1400,
    height: 1050,
    caption: 'Wood-finish ceiling panels, house frontage',
    alt: 'Two-storey house frontage with wood-finish slatted ceiling panels on the balcony and porch',
  },
  {
    src: '/media/work/white-aluminium-casement-window.webp',
    width: 960,
    height: 1280,
    caption: 'White aluminium casement window',
    alt: 'White aluminium-framed casement window with an open glass sash and black handle',
  },
  {
    src: '/media/work/wood-finish-soffit-panels.webp',
    width: 1400,
    height: 1050,
    caption: 'Wood-finish soffit panels',
    alt: 'Underside of a roof overhang finished with wood-grain slatted panels against a blue sky',
  },
  {
    src: '/media/work/wood-finish-ceiling-panel-interior.webp',
    width: 1050,
    height: 1400,
    caption: 'Wood-finish ceiling panel, interior',
    alt: 'Indoor false ceiling with a recessed dark wood-finish slatted panel',
  },
]
