import { useRef, type ReactNode } from "react"
import {
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react"
import GlassPanel from "./GlassPanel"
import { modalShellStyles } from "./modal-shell-styles"

interface ModalShellProps {
  children: ReactNode
  finalFocusEl: () => HTMLElement | null
  onClose: () => void
  open: boolean
  title: string
}

export default function ModalShell({
  children,
  finalFocusEl,
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
              elevation="strong"
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

              <Dialog.Body {...modalShellStyles.body}>
                {children}
              </Dialog.Body>
            </GlassPanel>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
