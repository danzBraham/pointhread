"use client";

import { prisma } from "@/utils/prisma";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce"; // Impo

export default function InitializedMDXEditor({ markdown, summaryId, ...props }) {
  const [content, setContent] = useState(markdown); // Track editor content
  const [debouncedContent] = useDebounce(content, 1000); // Debounce the content change (1 second)
  const ref = useRef(null);

  useEffect(() => {
    const updateSummary = async () => {
      if (debouncedContent) {
        try {
          const response = await fetch("/api/summaries", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: summaryId,
              summary: debouncedContent,
            }),
          });

          if (!response.ok) {
            console.error("Error updating summary:", await response.json());
          }
        } catch (error) {
          console.error("Error updating summary:", error);
        }
      }
    };

    updateSummary();
  }, [debouncedContent, summaryId]);

  return (
    <MDXEditor
      ref={ref}
      markdown={content}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      onChange={(value) => setContent(value)} // Update content state when editor changes
      {...props}
    />
  );
}
