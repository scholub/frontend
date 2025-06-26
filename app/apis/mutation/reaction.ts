import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReaction, deleteReaction } from "../reaction";
interface ArticleData {
  title: string;
  description: string;
  paper_id: string;
  category: string;
  tag: string;
  created: Date;
  modified: Date;
  like_count: number;
  dislike_count: number;
}

interface HandleReactionMutationParams {
  paper_id: string;
  reactionData: "like" | "dislike" | null;
}

export function useHandleReactionMutation({ paper_id, reactionData }: HandleReactionMutationParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reaction: "like" | "dislike") => {
      if (!paper_id)
        throw new Error("Paper ID is required for reaction mutation");
      if (reactionData === reaction) {
        return deleteReaction(paper_id);
      } else {
        return postReaction(paper_id, reaction);
      }
    },
    onMutate: async (reaction) => {
      await queryClient.cancelQueries({ queryKey: ["articleData", paper_id] });
      const previousArticleData = queryClient.getQueryData(["articleData", paper_id]);
      queryClient.setQueryData(
        ["articleData", paper_id],
        (old: ArticleData | undefined) => {
          if (!old) return old;
          const updatedData = { ...old };
          if (reaction === "like") {
            updatedData.like_count += reactionData === "like" ? -1 : 1;
            if (reactionData === "dislike") updatedData.dislike_count -= 1;
          } else if (reaction === "dislike") {
            updatedData.dislike_count += reactionData === "dislike" ? -1 : 1;
            if (reactionData === "like") updatedData.like_count -= 1;
          }
          return updatedData;
        }
      );
      return { previousArticleData };
    },
    onError: (err, reaction, context) => {
      queryClient.setQueryData(
        ["articleData", paper_id],
        context?.previousArticleData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articleData", paper_id] });
    },
  });
}
