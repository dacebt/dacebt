import React, { type ReactNode } from "react"
import { Box, Text } from "@chakra-ui/react"
import CompactAction from "./ui/CompactAction"

interface RouteContentBoundaryProps {
  children: ReactNode
}

interface RouteContentBoundaryState {
  failed: boolean
}

class RouteContentBoundary extends React.Component<
  RouteContentBoundaryProps,
  RouteContentBoundaryState
> {
  state: RouteContentBoundaryState = { failed: false }

  static getDerivedStateFromError(): RouteContentBoundaryState {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <Box
          role="alert"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          p={4}
          textAlign="center"
        >
          <Text textStyle="panelTitle" color="text.primary">
            Interface unavailable
          </Text>
          <Text textStyle="supportingText" color="text.muted">
            This page could not load. Reload the page to try again.
          </Text>
          <CompactAction
            emphasis="primary"
            onClick={() => window.location.reload()}
          >
            Reload page
          </CompactAction>
        </Box>
      )
    }

    return this.props.children
  }
}

export default RouteContentBoundary
