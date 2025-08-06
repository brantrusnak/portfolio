"use client";

import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import { Button, Card } from "@/components/ui";

export default function NotFoundCard() {
  return (
    <Card
      role="alert"
      aria-labelledby="not-found-heading"
      aria-describedby="not-found-description"
    >
      <Card.Header className="text-center">
        <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
        <h1 id="not-found-heading" className="text-4xl font-bold mb-2">
          404
        </h1>
        <h2 className="text-xl text-foreground/80 mb-4">Page Not Found</h2>
      </Card.Header>
      <Card.Content>
        <p id="not-found-description" className="text-foreground/60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </Card.Content>
      <Card.Footer>
        <Link href="/">
          <Button
            size="lg"
            leftIcon={<FaHome />}
            variant="primary"
            aria-label="Go to homepage"
          >
            Go Back
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
