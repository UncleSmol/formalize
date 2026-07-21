"use client";

export function DeleteCategoryButton({ deleteAction }: { deleteAction: () => void }) {
  return (
    <form
      action={deleteAction}
      onSubmit={(e) => {
        if (!confirm("Delete this category?")) e.preventDefault();
      }}
      className="inline"
    >
      <button
        type="submit"
        className="rounded border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-bold uppercase text-red-600 transition-colors hover:bg-red-100"
      >
        Delete
      </button>
    </form>
  );
}
