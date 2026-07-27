import {
  useRef,
  type ReactNode,
  type Ref,
} from "react"
import {
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react"
import GlassPanel from "./GlassPanel"
import { modalShellStyles } from "./modal-shell-styles"

interface ModalShellProps {
  bodyRef?: Ref<HTMLDivElement>
  children: ReactNode
  finalFocusEl: () => HTMLElement | null
  footer?: ReactNode
  onBodyScrollIntent?: () => void
  onClose: () => void
  open: boolean
  title: string
}

export default function ModalShell({
  bodyRef,
  children,
  finalFocusEl,
  footer,
  onBodyScrollIntent,
  onClose,
  open,
  title,
}: ModalShellProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={({ open: nextOpen }) => {
        if (!nextOpen) onClose()
      }}
      initialFocusEl={() => closeButtonRef.current}
      finalFocusEl={finalFocusEl}
      closeOnEscape
      closeOnInteractOutside
      modal
      preventScroll
      restoreFocus
      trapFocus
    >
      <Portal>
        <Dialog.Backdrop {...modalShellStyles.backdrop} />
        <Dialog.Positioner {...modalShellStyles.positioner}>
          <Dialog.Content asChild>
            <GlassPanel
              surface="modal"
              cornerAccents
              {...modalShellStyles.content}
            >
              <Dialog.Header {...modalShellStyles.header}>
                <Dialog.Title {...modalShellStyles.title}>
                  {title}
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    ref={closeButtonRef}
                    type="button"
                    aria-label={`Close ${title}`}
                    size="md"
                    {...modalShellStyles.closeControl}
                  />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body
                ref={bodyRef}
                {...modalShellStyles.body}
                {...modalShellStyles.scrollContainment}
                aria-label={`${title} scrollable content`}
                tabIndex={0}
                onKeyDown={(event) => {
                  if ([
                    "ArrowDown",
                    "ArrowUp",
                    "End",
                    "Home",
                    "PageDown",
                    "PageUp",
                    " ",
                  ].includes(event.key)) {
                    onBodyScrollIntent?.()
                  }
                }}
                onPointerDown={onBodyScrollIntent}
                onWheel={onBodyScrollIntent}
                onTouchMove={onBodyScrollIntent}
              >
                {children}
              </Dialog.Body>
              {footer && (
                <Dialog.Footer {...modalShellStyles.footer}>
                  {footer}
                </Dialog.Footer>
              )}
            </GlassPanel>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
