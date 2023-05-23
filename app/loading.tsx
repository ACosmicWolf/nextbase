import LoadingComponent from "@/components/Loading";

export default function loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <LoadingComponent />
    </div>
  );
}
